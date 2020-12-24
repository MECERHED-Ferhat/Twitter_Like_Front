import React, { useEffect, useReducer, useContext, useRef } from "react";
import "./add_tweet.css";
import Separator from "../utility/Separator";
import UserContext from "../../context/userContext";
import axiosInstance from "../../utility/APIFetch";

const initialForm = {
  submitable: false,
  description: "",
  picture: null,

  pic_preview: null,
};
const reducerForm = (state, action) => {
  // action = {type, description, picture, pic_preview, submitable}
  // action.type = ["init", "setDescription", "setPicture", "setPreview", "setSubmitable"]
  switch (action.type) {
    case "init":
      return initialForm;
    case "setDescription":
      return { ...state, description: action.description };
    case "setPicture":
      return { ...state, picture: action.picture };
    case "setPreview":
      return { ...state, pic_preview: action.pic_preview };
    case "setSubmitable":
      return { ...state, submitable: action.submitable };
    default:
      return state;
  }
};

export default function AddTweet({ appendNewsCb }) {
  const currentUser = useContext(UserContext);
  const refTextForm = useRef(null);
  const refImgForm = useRef(null);
  const [tweetForm, disTweetForm] = useReducer(reducerForm, initialForm);

  useEffect(() => {
    disTweetForm({
      type: "setSubmitable",
      submitable: tweetForm.description || tweetForm.picture,
    });
  }, [tweetForm.description, tweetForm.picture]);

  const handleChangeDescription = (event) => {
    disTweetForm({
      type: "setDescription",
      description: event.target.value,
    });
  };
  const handleChangeImage = (event) => {
    const reader = new FileReader();
    const img = refImgForm.current.files;

    reader.onload = () =>
      disTweetForm({
        type: "setPreview",
        pic_preview: reader.result,
      });

    disTweetForm({
      type: "setPicture",
      picture: img && img[0] ? img[0] : null,
    });

    if (img && img[0]) reader.readAsDataURL(img[0]);
    else
      disTweetForm({
        type: "setPreview",
        pic_preview: null,
      });
  };
  const handleClickClearImg = () => {
    refImgForm.current.value = "";
    handleChangeImage();
  };
  const handleSubmitForm = () => {
    if (tweetForm.description || tweetForm.picture) {
      var form = new FormData();
      form.append("description", tweetForm.description);
      if (tweetForm.picture) form.append("picture", tweetForm.picture);

      disTweetForm({
        type: "init",
      });
      refTextForm.current.value = "";

      axiosInstance.post("/news/", form).then(({ data }) => {
        if (data) {
          appendNewsCb(data);
        }
      });
    }
  };

  return (
    <div id="tweet-container">
      <div id="tweet" className="tweet_box">
        <div id="tweet-pic-container">
          <div id="tweet-pic" className="profile_pic">
            <img src={currentUser.user.picture} alt=""></img>
          </div>
        </div>
        <div id="tweet-area">
          <textarea
            ref={refTextForm}
            name="description"
            id="tweet-area-input"
            placeholder="What's happening?"
            onChange={handleChangeDescription}
          ></textarea>

          <div
            id="tweet-area-preview"
            className="default_pic"
            style={!tweetForm.pic_preview ? { display: "none" } : {}}
          >
            <img className="back_pic" src={tweetForm.pic_preview} alt="" />

            <i
              className="fas fa-times-circle"
              onClick={handleClickClearImg}
            ></i>
            <img className="front_pic" src={tweetForm.pic_preview} alt="" />
          </div>

          <div id="tweet-area-tools">
            <label id="tweet-tools-img">
              <i className="far fa-image"></i>

              <input
                type="file"
                name="image"
                onChange={handleChangeImage}
                ref={refImgForm}
              />
            </label>

            <button
              id="tweet-tools-btn"
              className={
                "button_blue" +
                (tweetForm.submitable ? " button_blue_active" : "")
              }
              onClick={handleSubmitForm}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}
