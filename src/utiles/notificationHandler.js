export const navigateToPost = (navigate, notification, isDecode) => {
  if (notification?.post_id || notification?.ad_id) {
    navigate("MainStackScreen", {
      data: notification,
      screen: "SinglePost",
      params: {
        post_id: notification?.post_id
          ? notification?.post_id
          : notification?.ad_id,
        is_comment: notification?.is_comment,
        type:
          notification?.ad_id || notification.type === "Ads" ? "Ads" : "Post",
      },
    });
  } else {
    const stringItem = isDecode
      ? JSON.parse(decodeURIComponent(notification.item))
      : String(notification?.item);
    const jsonData = isDecode ? stringItem : JSON.parse(`${stringItem}`);
    navigate("MainStackScreen", {
      data: notification,
      screen: "SinglePost",
      params: {
        post_id: jsonData?.postId,
        is_comment: false,
        type: notification?.type,
      },
    });
  }
};
export const navigateToGameInfo = (navigate, notification) => {
  navigate("MainStackScreen", {
    data: notification,
    screen: "GameInfo",
    params: {
      id: notification?.gameInfo
        ? notification?.gameInfo
        : notification?.event_id,
    },
  });
};

export const navigateToUserProfile = (navigate, notification) => {
  navigate("MainStackScreen", {
    data: notification,
    screen: "UserProfile",
    params: { id: notification?.user_id },
  });
};

export const navigateToHub = (navigate, notification) => {
  navigate("MainStackScreen", {
    data: notification,
    screen: "TabStackScreen",
    params: {
      screen: "Hub",
      params: { id: notification?.id },
    },
  });
};

export const navigateToLiveStream = (navigate, notification) => {
  const userProfile = {
    profile_photo: notification?.user_profile_photo,
    file_resized: notification?.user_profile_photo,
    id: notification?.user_id,
  };

  navigate("MainStackScreen", {
    data: notification,
    screen: "AudienceLiveStream",
    params: {
      liveID: notification?.liveID,
      userProfile,
    },
  });
};

export const navigateToHubChat = (navigate, notification) => {
  navigate("MainStackScreen", {
    data: notification,
    screen: "HubChat",
    params: {
      id: notification?.id,
      isNotification: true,
    },
  });
};
export const navigateToReel = (navigate, notification, isDecode) => {
  if (notification?.item) {
    const stringItem = isDecode
      ? JSON.parse(decodeURIComponent(notification.item))
      : String(notification?.item);

    const jsonData = isDecode ? stringItem : JSON.parse(`${stringItem}`);
    navigate("MainStackScreen", {
      data: notification,
      screen: "VideoDetailReel",
      params: {
        item: jsonData,
        url: notification?.url,
      },
    });
  }
};

export const notificationRoutingHandler = (
  navigate,
  notification,
  isDecode = false
) => {
  switch (notification?.navigationId) {
    case "singlePost":
      return navigateToPost(navigate, notification, isDecode);
    case "singleCampaign":
      return navigateToPost(navigate, notification, isDecode);
    case "EventDetail":
      return navigateToGameInfo(navigate, notification);
    case "gameInfo":
      return navigateToGameInfo(navigate, notification);
    case "GameBooked":
      return navigateToGameInfo(navigate, notification);
    case "userProfile":
      return navigateToUserProfile(navigate, notification);
    case "hub":
      return navigateToHub(navigate, notification);
    case "audienceLiveStream":
      return navigateToLiveStream(navigate, notification);
    case "chat":
      return navigateToHubChat(navigate, notification);
    case "BookCourse":
      return navigateToCourset(navigate, notification);
    case "courseInfo":
      return navigateToCourset(navigate, notification);
    case "reel":
      return navigateToReel(navigate, notification, isDecode);
    default:
      return "";
  }
};
