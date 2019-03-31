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
   * Iterates on the current items and, for each of them,
   * performs an update on its quality
   * iff the conditions, specific for the item type, are met.
   * @returns {Array}
   */
  updateQuality() {
    this.items.forEach(item => {
      if (item.name !== this.BRIE && item.name !== this.BACKSTAGE_PASSES) {
        if (item.quality > 0) {
          if (item.name !== this.SULFURAS) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name === this.BACKSTAGE_PASSES) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (item.name !== this.SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name !== this.BRIE) {
          if (item.name !== this.BACKSTAGE_PASSES) {
            if (item.quality > 0) {
              if (item.name !== this.SULFURAS) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
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
}
