const {expect} = require('chai');
const {Shop, Item} = require('../src/gilded_rose.js');
describe("The default behavior", () => {
  it("Should not modify the name", () => {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });
  it("Should decrease the sellIn days count by one", () => {
    const gildedRose = new Shop([ new Item("foo", 10, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
  });
  it("Should decrease the quality of a generic item by 1", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
  it("Should decrease the quality of a generic item twice as fast once the Sell By Date has passed", () => {
    const gildedRose = new Shop([new Item("foo", -1, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(38);
  });
  it("The quality of an item should never be negative", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
});

describe("The behavior for 'Aged Brie'", () => {
  it("Should increase by one the quality the older it gets and sell by date has not passed", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 20, 40),
      new Item("Aged Brie", 10, 40),
      new Item("Aged Brie", 5, 40)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(41);
    expect(items[1].quality).to.equal(41);
    expect(items[2].quality).to.equal(41);
  });
  it("Should increase by two the quality when the sell by date has passed", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", -1, 42)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(44);
  });
  it("Should never increase the quality to more than 50", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 0, 49),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
});

describe("The behavior for 'Backstage passes'", () => {
  it("Should increase by one the quality when sell by date is more than 10", () => {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)]
    );
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
  });
  it("Should increase by two when the sell by date is 10 or less", () => {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]
    );
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });
  it("Should increase by three when the sell by date is 5 or less", () => {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(23);
  });
  it("Should never increase the quality to more than 50", () => {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 1, 49)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
  it("Should decrease the quality to 0 when the the sell by date passes", () => {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', -1, 49)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
});

describe("The behavior for Sulfuras", () => {
  it("Should not decrease the quality", () => {
    const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 0, 10),
        new Item("Sulfuras, Hand of Ragnaros", 5, 10),
        new Item("Sulfuras, Hand of Ragnaros", 10, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(10);
    expect(items[1].quality).to.equal(10);
    expect(items[2].quality).to.equal(10);
  });
  it("Should not decrease the sellIn days count", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", -1, 10),
      new Item("Sulfuras, Hand of Ragnaros", 5, 10),
      new Item("Sulfuras, Hand of Ragnaros", 10, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[1].sellIn).to.equal(5);
    expect(items[2].sellIn).to.equal(10);
  })
});

describe("The behavior for Conjured items", () => {
  it("Should decrease in quality twice as fast as normal items", () => {
    const gildedRose = new Shop([
      new Item("Conjured", 10, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(8);
  })
  it("Should never decrease in quality to less than 0", () => {
    const gildedRose = new Shop([
      new Item("Conjured", 10, 1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  })
});