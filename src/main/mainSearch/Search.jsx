import { Fragment, useRef, useState, useEffect, useContext } from "react";
import "./search.css";
import MainHeader from "../utility/MainHeader";
import UserInline from "../utility/UserInline";
import UserContext from "../../context/userContext";

const initialSearch = "";
const initialResults = [];

export default function Search() {
  const { header } = useContext(UserContext);
  const refSearchForm = useRef(null);
  const [search, setSearch] = useState(initialSearch);
  const [results, setResults] = useState(initialResults);

  useEffect(() => {
    var isMounted = true;
    var fetchResults;
    if (search) {
      fetchResults = setTimeout(() => {
        fetch(
          "http://127.0.0.1:8000/user/search/?" +
            new URLSearchParams({
              q: search,
            }),
          {
            headers: header,
          }
        )
          .then((res) => (res.ok ? res.json() : { results: initialResults }))
          .then((res) => {
            if (isMounted) setResults(res.results);
          });
      }, 1000);
    } else {
      setResults(initialResults);
    }
    return () => {
      isMounted = false;
      if (fetchResults) clearTimeout(fetchResults);
    };
    // eslint-disable-next-line
  }, [search]);

  const handleFocusSearch = (event) => {
    const hover_class = "search-focus";
    if (event.type === "focus")
      refSearchForm.current.classList.add(hover_class);
    else if (event.type === "blur")
      refSearchForm.current.classList.remove(hover_class);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  return (
    <Fragment>
      <MainHeader>
        <div className="cwd-search">
          <form className="search-bar" ref={refSearchForm}>
            <i className="search-loupe fas fa-search" />

            <input
              className="search-input"
              type="text"
              placeholder="Search Twitter"
              onChange={handleChangeSearch}
              onFocus={handleFocusSearch}
              onBlur={handleFocusSearch}
            />

            <i className="search-times fas fa-times-circle" />
          </form>

          <div className="search-sugg">
            {results.length > 0 ? (
              results.map((user) => (
                <UserInline key={user.username} user={user} />
              ))
            ) : (
              <Fragment />
            )}
          </div>
        </div>
      </MainHeader>

      <div className="search-res" />
    </Fragment>
  );
}
