export interface PricingStrategy {
    calculatePrice(basePrice: number): number;
}

export class HighDemandPricing implements PricingStrategy {
    calculatePrice(basePrice: number): number {
        // Increase price by 20% during high demand
        return basePrice * 1.2;
    }
}

export class LowDemandPricing implements PricingStrategy {
    calculatePrice(basePrice: number): number {
        // Decrease price by 10% during low demand
        return basePrice * 0.9;
    }
}