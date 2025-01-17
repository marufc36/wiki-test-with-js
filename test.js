require("chromedriver");
const fs = require("fs"); // Importing the 'fs' module
const path = require("path");
const assert = require("assert");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); // Importing Chrome options
const HomePage = require("./pages/HomePage");
const SearchedPage = require("./pages/searchedPage");
const HomePageStep = require("./Steps/HomePageStep");
const SearchedPageStep = require("./Steps/searchedPageStep");
const DownloadAsPdfPage = require("./pages/downloadAsPdfPage");
const DownloadAsPdfPageStep = require("./Steps/downloadAsPdfPageStep");
const FileUtils = require("./FileUtils/FileUtils");
const testData = require("./data/testData.json");


describe("Wikipedia Test Advanced Search Filter", function () {
    this.timeout(60000);
    let driver;
    let homePage, searchedPage, downloadAsPdfPage;
    let homePageStep, searchedPageStep, downloadAsPdfPageStep;
    const downloadFolder = path.join(__dirname, "download");
    const fileUtils = new FileUtils(downloadFolder);
    const searchTerm = testData.searchTerm;
    const expectedFileName = `${searchTerm.replace(/\s+/g, "_")}.pdf`;

    before(async function () {
        if (!fs.existsSync(downloadFolder)) {
            fs.mkdirSync(downloadFolder);
        }

        const chromeOptions = new chrome.Options();
        chromeOptions.setUserPreferences({
            "download.default_directory": downloadFolder,
            "download.prompt_for_download": false,
            "download.directory_upgrade": true,
            "safebrowsing.enabled": true,
        });

        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(chromeOptions)
            .build();

        await driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 30000, script: 30000 });
        homePage = new HomePage(driver);
        homePageStep = new HomePageStep(homePage);
        searchedPage = new SearchedPage(driver);
        searchedPageStep = new SearchedPageStep(searchedPage);
        downloadAsPdfPage = new DownloadAsPdfPage(driver);
        downloadAsPdfPageStep = new DownloadAsPdfPageStep(downloadAsPdfPage);
    });

    it("Open Home Page and Verify Home Page is Displayed", async function () {
        await homePageStep.openHomePageAndVerifyIshomePageDisplayed();
        await homePageStep.clickLanguageDropDownAndSelectLanguage();
        await homePageStep.searchForTermAndClickSubmitButton();
        await searchedPageStep.searchedPageDisplayed();
        await searchedPageStep.clickToolsDropDownAndDownloadAsPdf();
        await downloadAsPdfPageStep.clickDownloadBtn();
        const isDownloaded = await fileUtils.waitForFileDownload(expectedFileName);
        assert(isDownloaded, `File "${expectedFileName}" was not downloaded`);
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});
