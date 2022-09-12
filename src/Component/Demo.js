import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (evt) => {
    setSearch(evt.target.value);
  };

  useEffect(() => {
    const loadPost = () => {
      setLoading(true);
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((resp) => {
          // console.log(resp.data);
          setPost(resp.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadPost();
  }, []);

  return (
    <>
      <div className="container pt-3">
        <input
          type="text"
          className="p-2"
          placeholder="Search"
          onChange={handleChange}
        />
        {loading ? (
          <h4>loading...</h4>
        ) : (
          <table className="table table-striped mt-2">
            <tbody>
              <tr className="fs-5 table-dark">
                <td>Id</td>
                <td>Title</td>
                <td>Body</td>
              </tr>
              {post
                .filter((value) => {
                  if (search === "") {
                    return value;
                  } else if (
                    value.title.toLowerCase().includes(search.toLowerCase()) ||
                    value.body.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((row, i) => {
                  return (
                    <tr key={i}>
                      <td>{row.userId}</td>
                      <td>{row.title}</td>
                      <td>{row.body}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Demo;
