import { BuiltInTool, JsonSchemaType, ToolCallType } from '$lib/enums';
import type { OpenAIToolDefinition } from '$lib/types';

export const SANDBOX_TOOL_NAME = BuiltInTool.RUN_JAVASCRIPT;

export const SANDBOX_TIMEOUT_MS_DEFAULT = 10000;

export const SANDBOX_TIMEOUT_MS_MAX = 30000;

export const SANDBOX_OUTPUT_MAX_CHARS = 8192;

export const SANDBOX_EMPTY_OUTPUT = '(no output)';

export const SANDBOX_TRUNCATION_NOTICE = '[output truncated]';

export const SANDBOX_TOOL_DEFINITION: OpenAIToolDefinition = {
	type: ToolCallType.FUNCTION,
	function: {
		name: SANDBOX_TOOL_NAME,
		description:
			'Execute JavaScript in a sandboxed browser worker (no DOM, no page access). ' +
			'Top level await is supported. Use console.log to print intermediate values; ' +
			'a top level return statement is captured as the result.\n' +
			'\n' +
			'Symbolic computation is available via the `math` object (math.js 13.0.0):\n' +
			'- `math.evaluate(expr, scope)` — evaluate numeric/symbolic expressions\n' +
			'- `math.parse(expr)` — parse expression into an expression node\n' +
			'- `math.simplify(expr)` — simplify symbolic expressions\n' +
			'- `math.derivative(expr, variable)` — compute symbolic derivatives\n' +
			'- `math.integrate(expr, variable)` — compute symbolic integrals\n' +
			'- `math.multiply(a, b)` / `math.divide(a, b)` — symbolic arithmetic on expressions\n' +
			'- `math.unit(str)` — work with physical units\n' +
			'- `math.matrix(type, data)` — matrix operations\n' +
			'- `math.sqrt`, `math.pow`, `math.sin`, `math.cos`, etc. — math functions\n' +
			'Example: `math.simplify(math.parse(\'(x+1)^2 - x^2\'))` returns `2*x + 1`.\n' +
			'Example: `math.derivative(\'x^3 + x^2\', \'x\')` returns `3*x^2 + 2*x`.',
		parameters: {
			type: JsonSchemaType.OBJECT,
			properties: {
				code: {
					type: JsonSchemaType.STRING,
					description: 'JavaScript source to execute'
				},
				timeout_ms: {
					type: JsonSchemaType.NUMBER,
					description: `Execution timeout in milliseconds, default ${SANDBOX_TIMEOUT_MS_DEFAULT}, max ${SANDBOX_TIMEOUT_MS_MAX}`
				}
			},
			required: ['code']
		}
	}
};
