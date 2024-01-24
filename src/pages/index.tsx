import { useEffect, useState } from 'react';
import './index.less';
import { Tabs, Tooltip, Button, Image } from 'antd';
import logo from '../assets/logo.png';
import axios from 'axios';

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState<string>();
  const [data, setData] = useState<any[]>([]);

  /**
   * 切换tab
   *
   * @memberof Index
   */
  const tapTabs = (val: string) => {
    setCurrentIndex(val);
    window.localStorage.setItem('classify_index', val);
  };

  /**
   * 跳转
   *
   * @memberof Index
   */
  const tapRedirect = (val: string) => {
    window.open(val);
  };

  useEffect(() => {
    axios.get(process.env.DOMAIN + '/data.json').then(response => {
      const index = window.localStorage.getItem('classify_index') || '0';
      setData(response.data);
      tapTabs(index);
    });
  }, []);

  return (
    <div className="page_home">
      <div className="page_bk"></div>
      <div className="page_bk_cover"></div>
      <div className="app">
        <div className="logoContianer">
          <img src={logo} className="logo" />
          {process.env.TITLE}
        </div>
        {data.length > 0 ? (
          <Tabs activeKey={currentIndex} onChange={tapTabs}>
            {data.map((item: any, index) => {
              return (
                <Tabs.TabPane
                  tab={item.name}
                  key={String(index)}
                ></Tabs.TabPane>
              );
            })}
          </Tabs>
        ) : (
          ''
        )}
        <div className="listRow">
          {data[Number(currentIndex)]?.list?.map((group: any, i: number) => (
            <section className="listBox" key={String(i)}>
              {group.name ? <div className="name">{group.name}</div> : ''}
              <ul className="list">
                {group.list.map((item: any, index: number) => {
                  return (
                    <li className="item" key={String(index)}>
                      <div className="item-content">
                        {item.qrcode_url ? (
                          <Tooltip
                            placement="bottom"
                            color="#fff"
                            title={<Image src={item.qrcode_url}></Image>}
                          >
                            <Button className="item-text">{item.name}</Button>
                          </Tooltip>
                        ) : (
                          <>
                            <span
                              className="item-text"
                              onClick={() => tapRedirect(item.prod_url)}
                            >
                              {item.name}
                            </span>
                            {item.dev_url || item.qa_url ? (
                              <div className="multi">
                                <div className="multi-content">
                                  {item.dev_url ? (
                                    <span
                                      className="multi-url"
                                      onClick={() => tapRedirect(item.dev_url)}
                                    >
                                      研发
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                  {item.qa_url ? (
                                    <span
                                      className="multi-url"
                                      onClick={() => tapRedirect(item.qa_url)}
                                    >
                                      测试
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
