module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", 
  },
  testEnvironment: "jsdom", 
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], 
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/",
  ],
};
