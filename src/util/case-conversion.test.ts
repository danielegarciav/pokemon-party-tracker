import { kebabCaseToTitleCase } from './case-conversion';
import { expect, test } from 'vitest';

test('kebab-case to Title Case', () => {
  expect(kebabCaseToTitleCase('')).toBe('');
  expect(kebabCaseToTitleCase('foo')).toBe('Foo');
  expect(kebabCaseToTitleCase('kebab-case')).toBe('Kebab Case');
  expect(kebabCaseToTitleCase('another-kebab-case')).toBe('Another Kebab Case');
  expect(kebabCaseToTitleCase('\n👀\n')).toBe('\n👀\n');
});
