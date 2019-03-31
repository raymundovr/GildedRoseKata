class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ItemNames = {
  BRIE: 'Aged Brie',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED: 'Conjured'
};

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  /**
   * Determines whether an item can be sold
   * @param item
   * @returns {boolean}
   */
  static canBeSold(item) {
    return item.name !== ItemNames.SULFURAS;
  }

  /**
   * Determines whether the item should or not decrease in quality
   * @param item
   * @returns {boolean}
   */
  static qualityShouldBeDecreased(item) {
    return item.name !== ItemNames.BRIE && item.name !== ItemNames.BACKSTAGE_PASSES;
  }

  /**
   * Performs the quality decrease based on item properties
   * @param item
   * @returns {*|number}
   */
  static decreaseItemQuality(item) {
    let quality = item.quality;
    if (quality > 0) {
      if (item.name === ItemNames.CONJURED || item.sellIn < 0) {
        //Quality for this items decreases twice as normal
        quality = Math.max(0, quality - 2);
      } else {
        quality--;
      }
    }
    return quality;
  }

  /**
   * Performs the quality increase based in item properties
   * @param item
   * @returns {*}
   */
  static increaseItemQuality(item) {
    let quality = item.quality;
    if (quality < 50) {
      quality++;
      if (item.name === ItemNames.BRIE) {
        if (item.sellIn < 0 && quality < 50) quality++;
      } else if(item.name === ItemNames.BACKSTAGE_PASSES) {
        //Immediately return 0 if date has passed
        if (item.sellIn < 0) return 0;

        if (item.sellIn <= 10 && quality < 50) {
          quality++;
        }
        if (item.sellIn <= 5 && quality < 50) {
          quality++;
        }
      }
    }

    return quality;
  }

  /**
   * Iterates on the current items and, for each of them,
   * performs an update on its quality
   * iff the conditions, specific for the item type, are met.
   * @returns {Array}
   */
  updateQuality() {
    this.items.forEach(item => {
      //If the item can be sold and the quality is in the boundaries we can operate on it
      if (Shop.canBeSold(item)) {
        //Depending on the item we can increase or decrease the quality
        if (Shop.qualityShouldBeDecreased(item)) {
          item.quality = Shop.decreaseItemQuality(item);
        } else {
          item.quality = Shop.increaseItemQuality(item);
        }
        //Finally decrease the days count
        item.sellIn = item.sellIn - 1;
      }
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
};
