import React, { useState } from "react";
import "./datatable.css";

export const DataTableLte = ({ header, body }) => {
  const [crPage, setCrPage] = useState(1);
  const [showData, setShowData] = useState(10);
  const [row, setRow] = useState(body);
  const [crShow, setCrShow] = useState({
    crIncrement: row.length > 0 ? 1 : 0,
    toIncrement: row.length > 0 ? 10 : 0,
    allData: row.length,
  });

  const [pages, setPages] = useState(
    Array.from(
      { length: Math.ceil((row.length === 0 ? 1 : row.length) / showData) },
      (_, i) => i + 1
    )
  );
  const [pagesData, setPagesData] = useState(
    pages.filter((p, i) => i >= 0 && i < (pages.length > 5 ? 5 : pages.length))
  );

  const [pageCount, setPageCount] = useState(
    Math.ceil((row.length === 0 ? 1 : row.length) / showData)
  );

  const [order, setOrder] = useState({
    header: header[0],
    index: 0,
    ordered: "ASC",
  });

  const changeOrder = (header, index) => {
    let ordered = "";
    if (index === order.index) {
      if (order.ordered === "ASC") {
        ordered = "DESC";
      } else if (order.ordered === "DESC") {
        ordered = "ASC";
      }
    } else {
      ordered = "ASC";
    }

    if (header.key !== undefined) {
      let sorting = row.sort((a, b) => {
        if (a[header.key] < b[header.key]) {
          return ordered === "ASC" ? -1 : 1;
        }
        if (a[header.key] > b[header.key]) {
          return ordered === "ASC" ? 1 : -1;
        }
        return 0;
      });

      setRow(sorting)
      setOrder({
        header: header,
        index: index,
        ordered: ordered,
      });
    }
  };

  const changePage = (page) => {
    let toIncrement = page * showData;
    if (page === pageCount) {
      toIncrement = row.length;
    }

    setCrPage(page);
    setCrShow({
      crIncrement: page * showData + 1 - showData,
      toIncrement: toIncrement,
      allData: row.length,
    });

    if (page >= 5) {
      if (pages.length - 3 >= page) {
        setPagesData(pages.filter((p, i) => i >= page - 2 && i < page + 1));
      } else {
        setPagesData(
          pages.filter((p, i) => i >= pages.length - 4 && i <= pages.length)
        );
      }
    } else {
      setPagesData(
        pages.filter(
          (p, i) => i >= 0 && i < (pages.length > 5 ? 5 : pages.length)
        )
      );
    }
  };

  const nextPage = () => {
    let toIncrement = (crPage + 1) * showData;
    if (crPage + 1 === pageCount) {
      toIncrement = row.length;
    }

    setCrPage(crPage + 1);
    setCrShow({
      crIncrement: (crPage + 1) * showData + 1 - showData,
      toIncrement: toIncrement,
      allData: row.length,
    });

    if (crPage + 1 >= 5) {
      if (pages.length - 3 >= crPage + 1) {
        setPagesData(
          pages.filter((p, i) => i >= crPage + 1 - 2 && i < crPage + 1 + 1)
        );
      } else {
        setPagesData(
          pages.filter((p, i) => i >= pages.length - 4 && i <= pages.length)
        );
      }
    } else {
      setPagesData(
        pages.filter(
          (p, i) => i >= 0 && i < (pages.length > 5 ? 5 : pages.length)
        )
      );
    }
  };

  const prevPage = () => {
    let toIncrement = (crPage - 1) * showData;
    if (crPage - 1 === 1) {
      toIncrement = showData;
    }

    setCrPage(crPage - 1);
    setCrShow({
      crIncrement: (crPage - 1) * showData + 1 - showData,
      toIncrement: toIncrement,
      allData: row.length,
    });

    if (crPage - 1 >= 5) {
      if (pages.length - 3 >= crPage - 1) {
        setPagesData(
          pages.filter((p, i) => i >= crPage - 1 - 2 && i < crPage - 1 + 1)
        );
      } else {
        setPagesData(
          pages.filter((p, i) => i >= pages.length - 4 && i <= pages.length)
        );
      }
    } else {
      setPagesData(
        pages.filter(
          (p, i) => i >= 0 && i < (pages.length > 5 ? 5 : pages.length)
        )
      );
    }
  };

  const firstPage = () => {
    setCrPage(1);
    setCrShow({
      crIncrement: 1 * showData + 1 - showData,
      toIncrement: showData,
      allData: row.length,
    });

    setPagesData(
      pages.filter(
        (p, i) => i >= 0 && i < (pages.length > 5 ? 5 : pages.length)
      )
    );
  };

  const lastPage = () => {
    setCrPage(pageCount);
    setCrShow({
      crIncrement: pageCount * showData + 1 - showData,
      toIncrement: row.length,
      allData: row.length,
    });

    if (pages.length >= 5) {
      setPagesData(
        pages.filter((p, i) => i >= pages.length - 4 && i <= pages.length)
      );
    }
  };

  const changeShowingData = (val) => {
    setShowData(val);
    setPageCount(Math.ceil(row.length / val));
    const newPages = Array.from(
      { length: Math.ceil(row.length / val) },
      (_, i) => i + 1
    );
    setPages(newPages);

    setPagesData(
      newPages.filter(
        (p, i) => i >= 0 && i < (newPages.length > 5 ? 5 : newPages.length)
      )
    );

    let toIncrement = crPage * val;
    if (crPage === Math.ceil(row.length / val)) {
      toIncrement = row.length;
    }
    setCrShow({
      crIncrement: crPage * val + 1 - val,
      toIncrement: toIncrement,
      allData: row.length,
    });
  };

  const searching = (val) => {
    let _result = [];

    // search value by header key
    header.forEach((h) => {
      if (h.key !== undefined && h.searchable !== undefined && h.searchable) {
        body.forEach((b) => {
          if (b[h.key].toString().toLowerCase().match(val.toLowerCase()))
            _result = [..._result, b];
        });
      }
    });

    // remove duplicated object
    _result = _result.filter((value, index, self) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        _result.findIndex((_obj) => {
          return JSON.stringify(_obj) === _value;
        })
      );
    });

    setRow(_result);
    setCrPage(1);

    let newPages = Array.from(
      { length: Math.ceil(_result.length / showData) },
      (_, i) => i + 1
    );
    setPageCount(Math.ceil(_result.length / showData));
    setPages(newPages);

    setPagesData(
      newPages.filter(
        (p, i) => i >= 0 && i < (newPages.length > 5 ? 5 : newPages.length)
      )
    );

    let toIncrement = 1 * showData;
    if (1 === Math.ceil(_result.length / showData)) {
      toIncrement = _result.length;
    }

    setCrShow({
      crIncrement: 1,
      toIncrement: toIncrement,
      allData: _result.length,
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-12 table-responsive">
          <div className="row">
            <div className="col-md-6">
              <div
                className="d-flex align-items-center"
                style={{ width: "200px" }}
              >
                <span>Show</span>
                <select
                  name=""
                  id=""
                  className="form-select mx-2"
                  value={showData}
                  onChange={(e) => changeShowingData(e.target.value)}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>entries</span>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <div
                className="d-flex align-items-center"
                style={{ width: "250px" }}
              >
                <span>Search:</span>
                <input
                  type="text"
                  className="ms-2 form-control"
                  onChange={(e) => searching(e.target.value)}
                />
              </div>
            </div>
          </div>
          <table className="table table table-striped mt-3 datatable-lte">
            <thead>
              <tr>
                {header.map((h, i) => {
                  return (
                    <th
                      key={i}
                      className={
                        order.index === i
                          ? order.ordered === "ASC"
                            ? "order-asc"
                            : "order-desc"
                          : ""
                      }
                      onClick={() => {
                        changeOrder(h, i);
                      }}
                    >
                      <div className="d-flex justify-content-between w-100">
                        <span>{h.title}</span>
                        <div>
                          <span className="ascending">&#8639;</span>
                          <span className="descending">&#8642;</span>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {row.length === 0 && (
                <tr style={{ textAlign: "center" }} className="bg-proccess">
                  <td colSpan="6" className="bg-proccess">
                    No data available in table
                  </td>
                </tr>
              )}
              {row.length > 0 &&
                row.map((b, i) => {
                  const checkPage =
                    i >= crPage * showData - showData && i < crPage * showData;

                  return (
                    checkPage && (
                      <tr key={i}>
                        {header.map((h, ih) => {
                          let val = "";
                          if (b[h.key] !== undefined) {
                            val = b[h.key];
                          } else {
                            if (h.increment !== undefined && h.increment)
                              val = i + 1;
                            if (h.render !== undefined) {
                              val = h.render(b, i);
                            }
                          }

                          return <td key={ih}> {val} </td>;
                        })}
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
          <div className="row mt-3 align-items-center">
            <div className="col-md-6">
              Showing {crShow.crIncrement} to {crShow.toIncrement} of{" "}
              {crShow.allData} entries
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <nav>
                <ul className="pagination">
                  <li
                    className={
                      crPage === 1 ? "page-item disabled" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      disabled={crPage === 1}
                      onClick={() => prevPage()}
                    >
                      prev
                    </button>
                  </li>
                  {pages.length > 5 && crPage >= 5 && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => firstPage()}>
                        {pages[0]}
                      </button>
                    </li>
                  )}
                  {pages.length > 5 && crPage >= 5 && (
                    <li className="page-item disabled">
                      <button className="page-link">...</button>
                    </li>
                  )}
                  {pagesData.map((page) => (
                    <li
                      className={
                        page === crPage ? "page-item active" : "page-item"
                      }
                      key={page}
                      onClick={() => changePage(page)}
                    >
                      <button className="page-link">{page}</button>
                    </li>
                  ))}
                  {pages.length > 5 && crPage < pages.length - 2 && (
                    <li className="page-item disabled">
                      <button className="page-link">...</button>
                    </li>
                  )}
                  {pages.length > 5 && crPage < pages.length - 2 && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => lastPage()}>
                        {pages[pages.length - 1]}
                      </button>
                    </li>
                  )}
                  <li
                    className={
                      crPage === pageCount ? "page-item disabled" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      onClick={() => nextPage()}
                      disabled={crPage === pageCount}
                    >
                      next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
