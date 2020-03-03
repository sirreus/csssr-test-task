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

  // >> первый способ проверки (быстрый, общее время 3s) <<
  const actualLink = (
    await I.grabAttributeFrom(
      '//a[text()="Софт для быстрого создания скриншотов"]',
      "href"
    )
  ).split("://")[1];
  assert.equal(
    actualLink,
    expectedLink.split("://")[1],
    `Your actual link in href atribut ${actualLink} NOT equal to expected ${
      expectedLink.split("://")[1]
    }`
  );

  // >> второй способ проверки (медленный, общее время 4s) <<
  // const actualLink = (
  //   await I.grabAttributeFrom(
  //     '//a[text()="Софт для быстрого создания скриншотов"]',
  //     "href"
  //   )
  // ).split("://")[1];
  // if (actualLink.length > 0) {
  //   I.click('//a[text()="Софт для быстрого создания скриншотов"]');
  //   I.switchToNextTab();
  //   I.seeInCurrentUrl(actualLink);
  //   assert.equal(
  //     actualLink,
  //     expectedLink.split("://")[1],
  //     `Your current link ${actualLink} NOT equal to expected ${
  //       expectedLink.split("://")[1]
  //     }`
  //   );
  // } else {
  //   I.say("Attribut href at element < a > is empty");
  // }

  // >> третий способ проверки (еще медленней, общее время 5s) <<
  // I.click('//a[text()="Софт для быстрого создания скриншотов"]');
  // I.switchToNextTab();
  // const currentLink = (await I.grabCurrentUrl()).split("://")[1];
  // assert.equal(
  //   currentLink,
  //   expectedLink.split("://")[1],
  //   `Your current link ${currentLink} NOT equal to expected ${
  //     expectedLink.split("://")[1]
  //   }`
  // );
});
