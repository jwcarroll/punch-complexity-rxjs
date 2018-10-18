import { DevStarWarsService } from './starWarsService.dev';
import { ProductionStarWarsService } from './starWarsService.production';

let svc = new DevStarWarsService();

if (process.env.NODE_ENV === "production") {
  svc = new ProductionStarWarsService();
}

const starWarsService = svc;

export default starWarsService;
