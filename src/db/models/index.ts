// db/models/index.ts
import mongoose from 'mongoose';
import BusinessArea from './BusinessArea';
import Setting from './Setting';
import LaboratoryTemplate from './LaboratoryTemplate';

export function registerModels() {
  // Check if any models are already registered
  const registeredModels = mongoose.modelNames();

  // Register models in correct order (dependencies first)
  if (!registeredModels.includes('BusinessArea')) {
    mongoose.model('BusinessArea', BusinessArea.schema);
  }

  if (!registeredModels.includes('Setting')) {
    mongoose.model('Setting', Setting.schema);
  }

  if (!registeredModels.includes('LaboratoryTemplate')) {
    mongoose.model('LaboratoryTemplate', LaboratoryTemplate.schema);
  }
}

// Export models with proper error handling
export function getModel(name: string) {
  try {
    return mongoose.model(name);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("hasn't been registered")
    ) {
      registerModels();
      return mongoose.model(name);
    }
    throw error;
  }
}

// Export models
export { default as BusinessArea } from './BusinessArea';
export { default as Setting } from './Setting';
export { default as LaboratoryTemplate } from './LaboratoryTemplate';
