import { Router, Request, Response } from 'express';

const router = Router();

export class MainController {
  // GET /api/book/:id
  public async getMain(req: Request, res: Response): Promise<Response> {
    const bookId = req.params.id;
    console.log(`Fetching main with id: ${bookId}`);
    // Simulate fetching book info...
    return res.send(`Main info for id: ${bookId}`);
  }

  // POST /api/book/
  public async createMain(req: Request, res: Response): Promise<Response> {
    const { title, author } = req.body;
    // Simulate book creation...
    return res.send(`Main created: ${title} by ${author}`);
  }
}

const mainController = new MainController();

router.get('/:id', (req: Request, res: Response) => {
  return mainController.getMain(req, res);
});

router.post('/', (req: Request, res: Response) => {
  return mainController.createMain(req, res);
});

export default router;
