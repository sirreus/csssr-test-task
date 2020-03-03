const assert = require("assert");

Feature("common-test");

Scenario("Check link url", async I => {
  const expectedLink = "http://monosnap.com/";
  I.amOnPage("/");
  I.waitForElement("section.graphs");
  I.scrollTo("section.graphs");
  I.seeElement("div.graphs-errors");
  I.seeElement('//a[text()="НАХОДИТЬ НЕСОВЕРШЕНСТВА"]');
  I.click('//a[text()="НАХОДИТЬ НЕСОВЕРШЕНСТВА"]');
  I.waitForElement('//div[@class="graphs-errors graph-active"]', 5);
  I.waitForVisible('//div[@class="info-errors"][@style="display: block;"]');
  I.seeElement('//a[text()="Софт для быстрого создания скриншотов"]');
  const actualLink = (
    await I.grabAttributeFrom(
      '//a[text()="Софт для быстрого создания скриншотов"]',
      "href"
    )
  ).split("://")[1];
  if (expectedLink !== actualLink) {
    I.say(
      `Your actual link in href atribut ${actualLink} not equal to expected ${expectedLink}`
    );
    I.click('//a[text()="Софт для быстрого создания скриншотов"]');
    I.switchToNextTab();
    const currentLink = (await I.grabCurrentUrl()).split("://")[1];
    assert.equal(currentLink, actualLink);
    I.say(
      `But redirect by actual link in href atribut ${actualLink} is corrects`
    );
  }
});
