import { describe, it, expect } from 'vitest';
import { setup } from '../../src/core/Game';

describe('setup', () => {
	it('should create a game with the number of computer players supplied', async () => {
		const game = setup(2);

		expect(game.players).toHaveLength(3);
	});
});
