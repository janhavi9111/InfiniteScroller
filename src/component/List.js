import React, { useEffect, useState } from "react";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

export const List = () => {
  const [listData, setListData] = useState([]);
  const [curPage, setCurrPage] = useState(1);
  const [more, setHasMore] = useState(true);

  const fetchData = (page) => {
    fetch(
      `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result?.nodes?.length) {
          setListData([...listData, ...result?.nodes]);
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => console.log(err, "error"));
  };

  useEffect(() => {
    fetchData(curPage);
  }, [curPage]);

  const handleLoadMore = () => {
    setCurrPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={listData?.length || 1}
        next={handleLoadMore}
        hasMore={more}
        loader={<div>Loading...</div>}
        endMessage={
          <p style={{ textAlign: "center" }}>No more articles to load.</p>
        }
      >
        {listData?.map((e) => {
          return (
            <div className="listcontainer" key={e?.node?.nid}>
              <img src={e?.node?.field_photo_image_section} alt="not found" />
              <div className="titleContaine">
                <div className="title">{e?.node?.title}</div>
                <div className="date">
                  {moment(e?.node?.last_update).format("lll")}
                </div>
                <a
                  href={`https://www.pinkvilla.com${e?.node?.path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="readMore"
                >
                  {" "}
                  Read More
                </a>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </>
  );
};
