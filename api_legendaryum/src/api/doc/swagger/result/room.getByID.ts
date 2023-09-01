/**
 * @openapi
 * components:
 *   responses:
 *     roomGetByIdResult:
 *       description: get by id room
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           content:
 *            type: object
 *            properties:
 *             id:
 *              type: string
 *              example: 7a9fb9ca-9a93-42e3-9ff5-ac4a98dcfff1
 *             countCoins:
 *               type: number
 *               example: 10
 *             nameRoom:
 *              type: string
 *              example: cubo
 *             expireCointDate:
 *              type: string
 *              example: 2023-09-01T16:43:00.936Z
 *             peopleId:
 *               type: array
 *               items:
 *                 items: string
 *               example:
 *                 - 727ff7eb-c98c-4419-97e9-c8888f05af4a
 *                 - 10218bbb-1973-4160-9a71-bcc1188d5c78
 *                 - e255c661-49d8-4e38-a29e-39e45e4f24e5
 *                 - 91741ae4-1653-404b-b4d8-2ab5a57b8e71
 *                 - 8dab2591-f345-4da5-8f04-5a7d4e86fe3a
 *             dimensionX:
 *              type: number
 *              example: 50
 *             dimensionY:
 *              type: number
 *              example: 50
 *             dimensionZ:
 *              type: number
 *              example: 50
 *             coinIds:
 *               type: array
 *               items:
 *                 items: string
 *               example:
 *                 - 727ff7eb-c98c-4419-97e9-c8888f05af4a
 *                 - 10218bbb-1973-4160-9a71-bcc1188d5c78
 *                 - e255c661-49d8-4e38-a29e-39e45e4f24e5
 *                 - 91741ae4-1653-404b-b4d8-2ab5a57b8e71
 *                 - 8dab2591-f345-4da5-8f04-5a7d4e86fe3a
 *
 */
