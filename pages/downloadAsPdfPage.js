const { By, until } = require("selenium-webdriver");

class DownloadAsPdfPage {
    constructor(driver) {
        this.driver = driver;
        this.downloadBtnLocator = By.xpath("//span[@class='oo-ui-labelElement-label' and text()='Download']");
        
    }

    async downloadBtn() {
        const downloadBtn = await this.driver.findElement(this.downloadBtnLocator);
        await downloadBtn.click();
    }
}

module.exports = DownloadAsPdfPage;