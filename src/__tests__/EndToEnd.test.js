import puppeteer from "puppeteer";

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

//Write end-to-end tests for the first feature of your Meet app: “Filter events by city.”
//new scope

describe('filer events by city', ()=>{
    
})
