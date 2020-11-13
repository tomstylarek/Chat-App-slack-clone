import React, { useState, useContext, useEffect } from "react";
import firebase from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';

import hashtagIcon from "./hashtag.svg";
import addIcon from "./add-icon.svg";
import ArrowDownIcon from './arrow-down.svg';

function Channels() {
  const { currentUser } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);
  const [channelInfo, setChannelInfo] = useState({
    channelName: "",
    channelDetails: ""
  });
  const [displayAddChannel, setDisplayAddChannel] = useState(false);
  // add reference to the collection of channels in the db
  const [channelsRef, setChannelsRef] = useState(firebase.database().ref('channels'));

  useEffect(() => {
    addListeners();
  }, []);

  function addListeners() {
    let loadedChannels = [];
    channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      setChannels(loadedChannels);
    })
  }

  function openAddChannelWindow() {
    setDisplayAddChannel(true);
  }

  function closeAddChannelWindow() {
    setDisplayAddChannel(false);
  }

  function isFormValid({ channelName, channelDetails }) {
    if (channelName === '' || channelDetails === '') {
      return false;
    }
    return true;
  }

  function addChannel() {
    // get a unique identifier for the new channel
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelInfo.channelName,
      details: channelInfo.channelDetails,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      }
    }

    channelsRef
      // set the new channel as a child of the collection
      .child(key)
      .update(newChannel)
      .then(() => {
        closeAddChannelWindow();
        setChannelInfo({ channelName: '', channelDetails: '' });
        console.log('channel added');
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleSubmit(event) {
    event.preventDefault();

    if ( isFormValid(channelInfo) ) {
      addChannel();
    }
  }

  function handleChange(event) {
    setChannelInfo(prevInfo => {
      return {
        ...prevInfo,
        [event.target.name]: event.target.value
      };
    });
  }

  function displayChannels(channels) {
    if (channels.length > 0) {
      const channelElements = channels.map(channel => (
        <li className="channel-item" key={channel.id} onClick={() => console.log(channel)}><img src={hashtagIcon} alt="#" />{channel.name}</li>
      ));

      return <ul className="Channel-items">{channelElements}</ul>;
    }
  }

  return (
    <div className="Channels-component">
      <div className="Channels">
        <div className="Channels-name">
          <img src={ArrowDownIcon} alt="" />
          channels
          <span className="Channel-counter">{channels.length}</span>
        </div>
        <div onClick={openAddChannelWindow} className="Channels-add">
          <img src={addIcon} alt="+" />
        </div>
      </div>

      {/* channel items */}
      {displayChannels(channels)}

      {displayAddChannel ? (
        <div className="add-channel-window">
          <form className="add-channel-form">
            <input
              type="text"
              name="channelName"
              placeholder="Name"
              onChange={handleChange}
              value={channelInfo.channelName}
            />
            <input
              type="text"
              name="channelDetails"
              placeholder="Description"
              onChange={handleChange}
              value={channelInfo.channelDetails}
            />
            <div className="add-channel-buttons">
              <button onClick={handleSubmit} className="btn add-btn">
                Add
              </button>
              <button
                onClick={closeAddChannelWindow}
                className="btn cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Channels;
