import React from "react";

export const MyHeader = (navigation) => {
  return {
    header: (props) => <MyCustomHeader {...props} />,
    headerStyle: { backgroundColor: "#fff" },
    headerTintColor: "#000",
  };
};
