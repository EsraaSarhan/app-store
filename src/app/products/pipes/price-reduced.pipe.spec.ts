import { PriceReducedPipe } from './price-reduced.pipe';

describe('PriceReducedPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceReducedPipe();
    expect(pipe).toBeTruthy();
  });
});
