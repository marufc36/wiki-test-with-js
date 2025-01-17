const { By, until } = require("selenium-webdriver");
const testData = require("../data/testData.json");
class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.url = "https://www.wikipedia.org/";
        this.centralLogoLocator = By.xpath("//img[@class='central-featured-logo']");
        this.LanguageDropDownLocator = By.xpath("//select[@id='searchLanguage']");
        this.languageLocator = By.xpath("//option[@value='en']");
        this.searchBoxLocator = By.xpath("//input[@id='searchInput']");
        this.submitButtonLocator = By.xpath("//button[@type='submit']");
    }

    async open() {
        await this.driver.get(this.url);
    }

    async isMainPageDisplayed() {
        const centralLogo = await this.driver.findElement(this.centralLogoLocator);
        return centralLogo.isDisplayed
    }

    async languageDropDown() {
        const languageDropDown = await this.driver.findElement(this.LanguageDropDownLocator);
        await languageDropDown.click();
    }

    async selectLanguage() {
        const language = await this.driver.findElement(this.languageLocator);
        await language.click();
    }

    async searchBox() {
        const searchBox = await this.driver.findElement(this.searchBoxLocator);
        await searchBox.sendKeys(testData.searchTerm);
    }

    async submitButton() {
        const submitButton = await this.driver.findElement(this.submitButtonLocator);
        await submitButton.click();
    }

}

module.exports = HomePage;