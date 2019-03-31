class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.BRIE = 'Aged Brie';
    this.SULFURAS = 'Sulfuras, Hand of Ragnaros';
    this.BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert'
  }

  /**
   * Determines whether an item can be sold
   * @param item
   * @returns {boolean}
   */
  canBeSold(item) {
    return item.name !== this.SULFURAS;
  }

  qualityShouldBeDecreased(item) {
    return item.name !== this.BRIE && item.name !== this.BACKSTAGE_PASSES;
  }

  decreaseItemQuality(item) {
    return item.quality > 0 ? item.quality - 1 : 0;
  }

  increaseItemQuality(item) {
    let quality = item.quality;
    if (quality < 50) {
      quality++;
      if (item.name === this.BRIE) {
        if (item.sellIn <= 0 && quality < 50) quality++;
      } else if(item.name === this.BACKSTAGE_PASSES) {
        //Automatically set to 0 if the date has passed
        if (item.sellIn <= 0) return 0;

        if (item.sellIn < 11 && item.quality < 50) {
          quality++;
        }
        if (item.sellIn < 6 && item.quality < 50) {
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
      if (this.canBeSold(item)) {
        //Immediately decrease the soldIn days count
        item.sellIn = item.sellIn - 1;
        //Depending on the item we can increase or decrease the quality
        if (this.qualityShouldBeDecreased(item)) {
            item.quality = this.decreaseItemQuality(item);
        } else {
          item.quality = this.increaseItemQuality(item);
        }

        if (item.sellIn < 0) {
          if (item.name !== this.BRIE) {
            if (item.name !== this.BACKSTAGE_PASSES) {
              if (item.quality > 0) {
                item.quality = item.quality - 1;
              }
            }/* else {
              item.quality = item.quality - item.quality;
            }*/
          }
        }
      }
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
};
