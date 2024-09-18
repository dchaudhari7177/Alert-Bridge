// regressionModel.js

// Sample training data (temperature, humidity, wind speed) => risk level
const earthquakeTrainingData = [
    { x: [0, 80, 15], y: 1 },
    { x: [30, 40, 5], y: 2 },
    { x: [40, 20, 20], y: 3 },
  ];
  
  const floodTrainingData = [
    { x: [0, 80, 15], y: 1 },
    { x: [30, 60, 10], y: 2 },
    { x: [40, 70, 20], y: 3 },
  ];
  
  const trainLinearRegression = (data) => {
    const numFeatures = data[0].x.length;
    let weights = new Array(numFeatures).fill(0);
    const learningRate = 0.01;
    const epochs = 1000;
  
    for (let epoch = 0; epoch < epochs; epoch++) {
      data.forEach((point) => {
        const prediction = predict(point.x, weights);
        const error = prediction - point.y;
        weights = weights.map((weight, index) => weight - learningRate * error * point.x[index]);
      });
    }
  
    return weights;
  };
  
  const predict = (features, weights) => {
    return features.reduce((sum, feature, index) => sum + feature * weights[index], 0);
  };
  
  const earthquakeModel = trainLinearRegression(earthquakeTrainingData);
  const floodModel = trainLinearRegression(floodTrainingData);
  
  const evaluateEarthquakeRisk = (temperature, humidity, windSpeed) => {
    const inputFeatures = [temperature, humidity, windSpeed];
    return predict(inputFeatures, earthquakeModel);
  };
  
  const evaluateFloodRisk = (temperature, humidity, windSpeed) => {
    const inputFeatures = [temperature, humidity, windSpeed];
    return predict(inputFeatures, floodModel);
  };
  
  module.exports = {
    evaluateEarthquakeRisk,
    evaluateFloodRisk
  };
  