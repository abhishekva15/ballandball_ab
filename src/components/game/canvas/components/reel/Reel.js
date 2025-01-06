/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Assets,
  BlurFilter,
  Container,
  Graphics,
  Sprite,
  Texture,
} from "pixi.js";
import eventEmitter from "../../../../../utility/eventEmiiter";
export class Reel extends Container {
  //  reelContainer: Container;
  cellWidth;
  cellHeight;
  reelHeight;
  reelWidth;
  rows = 3;
  cols = 5;
  symbol;
  symbolMob;
  symbolColor;
  cellContainer;
  symbols = [];
  symbols_mob = [];
  spriteLoader;
  reels = [];
  loadAssets;
  reelIcon;
  colu;
  data;
  outcome;
  gameStatus;
  responseData;
  winCombos;
  pytArr;
  paylineArr;
  cmbIdx;
  cmbValue;
  isWin;
  totalPayout;
  updateGameStatus(newStatus) {
    console.log("updateStatus", newStatus);

    this.gameStatus = newStatus;
  }
  socket;
  app;
  scaleFactor;

  constructor(app) {
    super();
    this.app = app;

    this.gameStatus = "IDLE";
    this.reelContainer = new Container();
    this.symbol = new Container();
    this.symbolMob = new Container();
    this.symbolColor = new Container();
    this.cellContainer = new Container();
    this.setInitialDimensions();
    this.createReel();
    this.renderCells();

    this.scaleFactor = this.calculateScaleFactor(
      this.app.view.width / this.app.view.height
    );
    window.addEventListener("resize", this.onResize.bind(this));

    this.data = [
      [1, 1, 2, 3, 2],
      [3, 2, 2, 2, 2],
      [0, 1, 2, 3, 4],
      [5, 6, 7, 3, 4],
      [1, 1, 2, 3, 2],
    ];

    this.outcome = this.data.map((row) =>
      row.map((symbolIndex) => this.symbols[symbolIndex])
    );
  }

  getResData(resData) {
    console.log(resData);

    this.responseData = resData;
    // console.log(resData.reels);

    // this.data = this.responseData.reels;

    // this.totalPayout = this.responseData.payout;
    // // console.log(this.predefinedOutcome);
    // this.isWin = this.responseData.win;
    // const winCombos = resData.winCombos;
    // this.cmbIdx = winCombos.map((combo) => combo.cmbIdx);
    // this.pytArr = winCombos.map((combo) => combo.cmbPyt);
    // this.paylineArr = winCombos.map((combo) => combo.payline);
    // this.cmbValue = winCombos.map((combo) => combo.cmbVal);

    // console.log("cmbIdxArray:", this.cmbIdx);
    // console.log("cmbPytArray:", this.pytArr);
    // console.log("paylineArray:", this.paylineArr);
    // console.log("paylineArray:", this.cmbValue);
  }

  /**
   * Clears all responseData-related values to reset the game state.
   */
  cleanupResponseData() {
    this.responseData = null; // Clear response data
    this.data = []; // Reset the data array
    this.outcome = []; // Reset the outcome array
    this.totalPayout = ""; // Reset payout
    this.isWin = false; // Reset win state
    this.cmbIdx = []; // Clear combo indices
    this.pytArr = []; // Clear payout array
    this.paylineArr = []; // Clear payline array
    this.cmbValue = []; // Clear combo values

    console.log("Response data and related values have been cleared.");
  }

  /**
   * Initialize and add icons to containers.
   * @returns Object containing loaded symbols.
   */
  async introIcons() {
    if (this.symbols.length) return;

    console.log("Loading symbols...");
    const imageKeys = {
      0: "baseball.png",
      1: "basketball.png",
      2: "bowling.png",
      3: "football.png",
      4: "pool.png",
      5: "tennis.png",
      6: "volleyball.png",
    };

    // Create sprites and assign names
    this.symbols = {
      0: Object.assign(Sprite.from(imageKeys[0]), { name: "baseball" }),
      1: Object.assign(Sprite.from(imageKeys[1]), { name: "basketball" }),
      2: Object.assign(Sprite.from(imageKeys[2]), { name: "bowling" }),
      3: Object.assign(Sprite.from(imageKeys[3]), { name: "football" }),
      4: Object.assign(Sprite.from(imageKeys[4]), { name: "pool" }),
      5: Object.assign(Sprite.from(imageKeys[5]), { name: "tennis" }),
      6: Object.assign(Sprite.from(imageKeys[6]), { name: "volleyball" }),
    };

    console.log(this.symbols);
  }

  /**
   * Load symbols based on provided data and add to container.
   * @param baseImage The base texture for symbols.
   * @param data Array of symbol data.
   * @param container Target container to hold sprites.
   * @param targetArray Optional array to collect loaded sprites.
   */
  // async loadSymbols(baseImage, data, container, targetArray) {
  //   const frames = await jsonFetcher(symbolsRgbaFrames);
  //   for (const { key } of data) {
  //     const sprite = this.spriteLoader.getSprite(baseImage, frames, key);

  //     if (sprite) {
  //       this.symbols[key] = sprite;
  //       container.addChild(sprite);
  //       targetArray?.push(sprite);
  //     }
  //   }
  // }

  renderCells() {
    const rows = 3;
    const cols = 5;

    this.cellContainer.removeChildren();

    // Render each cell in the grid
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = new Graphics();
        cell.drawRect(0, 0, this.cellWidth, this.cellHeight);
        cell.endFill();

        cell.x = col * this.cellWidth + this.cellWidth / 2;
        cell.y = row * this.cellHeight + this.cellHeight / 2;
        this.cellContainer.addChild(cell);
      }
    }
    // this.cellContainer.name = "cellContainer";
    this.addChild(this.cellContainer);
  }

  /**
   * Initializes and creates reel items with masks and interactive spin button.
   */
  async createReel() {
    await this.introIcons();
    this.setInitialDimensions();
    this.onResize();
    this.renderCells();

    this.createReelColumns();
    this.applyMask();

    this.position.set(0, -this.reelHeight * 0.12);
    // this.reelContainer.scale.set(1.06, 1.06);
  }

  /**
   * Calculates initial dimensions based on background.
   */
  setInitialDimensions() {
    // this.position.set(this.app.view.x, 0);

    this.reelHeight = this.app.view.height * 1.4;
    // console.log(this.reelHeight);
    this.reelWidth = this.app.view.width;
    this.cellWidth = this.reelWidth / this.cols;
    this.cellHeight = this.reelHeight / this.rows;
  }

  /**
   * Sets up a resize listener to dynamically adjust the layout.
   */
  onResize() {
    const aspectRatio = this.app.view.width / this.app.view.height;
    const scaleFactor = this.calculateScaleFactor(aspectRatio);

    this.reelHeight = this.app.view.height * 1.4;
    this.reelWidth = this.app.view.width;
    this.cellWidth = this.reelWidth / this.cols;
    this.cellHeight = this.reelHeight / this.rows;

    // Adjust the position and scale of the reel container
    // this.position.set(0, -this.reelHeight * 0.12);
    // this.scale.set(scaleFactor, scaleFactor);

    // Re-render cells and columns to fit the new dimensions
    this.renderCells();
    this.reels.forEach((reel, col) => {
      reel.container.x = col * this.cellWidth;
      reel.symbols.forEach((symbol, row) => {
        symbol.width = this.cellWidth * 0.7;
        symbol.height = this.cellHeight * 0.7;
        symbol.x = (this.cellWidth - symbol.width) / 2;
        symbol.y =
          (row - 1) * this.cellHeight + (this.cellHeight - symbol.height) / 2;
      });
    });

    // Adjust the mask to fit the new dimensions
    this.applyMask();
  }

  /**
   * Creates columns and populates each with symbols.
   */
  createReelColumns() {
    for (let col = 0; col < this.cols; col++) {
      this.columnContainer = new Container();
      this.columnContainer.name = ` Column${col + 1}`;
      this.columnContainer.x = col * this.cellWidth;

      const reel = {
        container: this.columnContainer,
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new BlurFilter(),
      };

      this.populateColumnWithSymbols(this.columnContainer, reel);
      this.reels.push(reel);
      this.addChild(this.columnContainer);
    }
  }

  /**
   * Populates a column with random symbols.
   */
  populateColumnWithSymbols(columnContainer, reel) {
    for (let row = 0; row < this.cols; row++) {
      const sprite = this.getRandomSprite();
      // console.log(sprite);

      // Clone the sprite to avoid mutation
      const clonedSprite = new Sprite(sprite.texture);

      // Create a transparent cell graphic
      const cell = new Graphics();
      cell.beginFill(0xffffff, 0);
      cell.drawRect(0, 0, this.cellWidth, this.cellHeight);
      cell.endFill();

      // Position the cell and sprite within the column
      cell.y = (row - 1) * this.cellHeight;
      console.log();
      // clonedSprite.scale.set(this.scaleFactor *1.7 ,this.scaleFactor * 3);
      if (this.app.view.width >= 381 && this.app.view.width <= 819) {
        console.log("asdasdasdads");
        clonedSprite.width = this.cellWidth * 0.5;
        clonedSprite.height = this.cellHeight * 0.8;
      } else {
        // console.log("asdasdasdads")

        clonedSprite.width = this.cellWidth * 0.7;
        clonedSprite.height = this.cellHeight * 0.7;
      }

      // clonedSprite.scale.set(this.scaleFactor * 1.5, this.scaleFactor * 2);
      clonedSprite.x = (this.cellWidth - clonedSprite.width) / 2;
      clonedSprite.y = cell.y + (this.cellHeight - clonedSprite.height) / 2;

      reel.symbols.push(clonedSprite);

      // columnContainer.addChild(cell);
      columnContainer.addChild(clonedSprite);
    }
  }

  /**
   * Retrieves a random sprite from available symbols.
   */
  getRandomSprite() {
    const symbolKeys = Object.keys(this.symbols);
    const randomKey = symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
    return this.symbols[randomKey];
  }

  /**
   * Creates and applies a mask to display only the central rows.
   */
  applyMask() {
    this.getChildByName("mask")?.destroy();
    const mask = new Graphics();
    mask.beginFill(0x000000);
    mask.drawRect(0, 0, this.cellWidth * 5, this.cellHeight * 3);
    mask.endFill();
    this.mask = mask;
    mask.name = "mask";
    this.addChild(mask);
  }
  // Calculate the scaling factor based on the aspect ratio
  calculateScaleFactor(aspectRatio) {
    console.log(aspectRatio);

    if (aspectRatio <= 0.36) return aspectRatio * 1.24;
    if (aspectRatio > 0.36 && aspectRatio <= 0.4) return aspectRatio * 0.45;
    if (aspectRatio > 0.4 && aspectRatio <= 0.65) return aspectRatio * 0.45;
    if (aspectRatio > 0.65 && aspectRatio <= 0.8) return aspectRatio * 0.5;
    if (aspectRatio > 0.8 && aspectRatio <= 1) return aspectRatio * 0.5;
    if (aspectRatio > 1 && aspectRatio <= 1.5) return aspectRatio * 0.45;
    if (aspectRatio > 1.5 && aspectRatio <= 1.8) return aspectRatio * 0.3;
    if (aspectRatio > 1.8 && aspectRatio <= 2.1) return aspectRatio * 0.25;
    if (aspectRatio > 2.1 && aspectRatio <= 2.5) return aspectRatio * 0.6;
    return aspectRatio * 0.6;
  }
}
