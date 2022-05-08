import puppeteer from "puppeteer";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    /* const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, 
       ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
      });*/
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event button");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event button");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });
});

//filter events by city

describe("filter events by city", () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    /* const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, 
       ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
      });*/
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("When user hasn’t searched for a city, show upcoming events from all cities.", async () => {
    const events = (await page.$$(".event")).length;
    expect(events).toBe(mockData.length);
  });

  test("user should see a list of suggestions when they search for a city", async () => {
    await page.type(".city", "Berlin, Germany", { delay: 200 });
    const suggestions = await page.$$(".suggestions li");
    //expect to be 2 because of "see all" li
    expect(suggestions).toHaveLength(2);
  });

  test("user can select a city from the suggested list.", async () => {
    await page.reload();
    let cityName = "Berlin, Germany";
    await page.type(".city", cityName, { delay: 200 });
    let eventsFiltered = mockData.filter((e) => e.location === cityName);
    await page.click(".suggestions .list-item");
    const events = (await page.$$(".event")).length;
    expect(events).toBe(eventsFiltered.length);
  });
});
