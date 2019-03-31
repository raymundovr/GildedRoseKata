const {expect} = require('chai');
const {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {
  it("Should not modify the name", () => {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });
  it("Should decrease the quality of a generic item by 1", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
  it("The quality of an item should never be negative", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
  it("Should decrease the quality of a generic item twice as fast once the Sell By Date has passed", () => {
    const gildedRose = new Shop([new Item("foo", 0, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(38);
  });
  it("Should increase by one the quality of 'Aged Brie' the older it gets", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 20, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(41);
  });
  it("Should increase the quality ", () => {

  });
  it("But the quality of an item should never more than 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
  it("Should do nothing to sulfuras", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(10);
  });
});

