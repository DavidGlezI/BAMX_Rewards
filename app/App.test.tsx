import React from "react";
import renderer from "react-test-renderer";
import RootLayout from "./_layout";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import TabHomeScreen from "./(tabs)/home";
import TabDonateScreen from "./(tabs)/donate";
import TabPromotionsScreen from "./(tabs)/promotions";
import axios from "axios";
import * as api from "../util/useApi";
import { act, render, waitFor } from "@testing-library/react-native";
import TabAccountScreen from "./(tabs)/account";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Snapshot tests for all pages", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Login page renders correctly", () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Register page renders correctly", () => {
    const tree = renderer.create(<RegisterScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Tabs donate page renders correctly", () => {
    const tree = renderer.create(<TabDonateScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Tabs promotions page renders correctly and makes api call", async () => {
    const spy = jest.spyOn(api, "useFetch");
    let tree;
    await act(async () => {
      tree = await renderer.create(<TabPromotionsScreen />);
    });
    expect(tree).toMatchSnapshot();
    // get data from backend on render
    expect(spy).toHaveBeenCalledWith("restaurants");
  });

  test("Tabs home page renders correctly and makes api call", async () => {
    const spy = jest.spyOn(api, "useFetch");
    let tree;
    await act(async () => {
      tree = await renderer.create(<TabHomeScreen />);
    });
    expect(tree).toMatchSnapshot();
    // get data from backend on render
    expect(spy).toHaveBeenCalledWith("restaurants");
  });

  test("Tabs account page renders correctly and makes api call", async () => {
    const spy = jest.spyOn(api, "useFetch");
    let tree;
    await act(async () => {
      tree = await renderer.create(<TabAccountScreen />);
    });
    expect(tree).toMatchSnapshot();
    // get data from backend on render
    expect(spy).toHaveBeenCalledWith("donations");
    expect(spy).toHaveBeenCalledWith("user");
  });
});
