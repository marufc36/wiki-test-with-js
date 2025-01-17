const { By, until } = require("selenium-webdriver");

class SearchedPage {
    constructor(driver) {
        this.driver = driver;
        this.searchedPageLocator = By.xpath("//span[@class='mw-page-title-main' and text()='Albert Einstein']");
        this.toolsDropDownLocator = By.xpath("//input[contains(@id,'tools-dropdown')]");
        this.downloadAsPdfLocator = By.xpath("//a[contains(@title,'Download')]");
    }

    async isSearchedPageDisplayed() {
        const searchedPage = await this.driver.findElement(this.searchedPageLocator);
        return searchedPage.isDisplayed();
    }

    async toolsDropDown() {
        const toolsDropDown = await this.driver.findElement(this.toolsDropDownLocator);
        await toolsDropDown.click();
    }

    async downloadAsPdf() {
        const downloadAsPdf = await this.driver.findElement(this.downloadAsPdfLocator);
        await downloadAsPdf.click();
    }
}

module.exports = SearchedPage;