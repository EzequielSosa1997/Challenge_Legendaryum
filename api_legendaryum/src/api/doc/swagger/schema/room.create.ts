/**
 * @openapi
 * components:
 *   schemas:
 *     RoomCreate:
 *       type: object
 *       properties:
 *        nameRoom:
 *         type: string
 *         example: cubo
 *        dimensionX:
 *         type: number
 *         example: 50
 *        dimensionY:
 *         type: number
 *         example: 50
 *        dimensionZ:
 *         type: number
 *         example: 50
 *        coins:
 *         type: array
 *         items:
 *            type: object
 *            properties:
 *             coordinateX:
 *              type: number
 *             coordinateY:
 *              type: number
 *             coordinateZ:
 *              type: number
 *         example:
 *            - coordinateX: 10
 *              coordinateZ: 12
 *              coordinateY: 10
 *            - coordinateX: 12
 *              coordinateZ: 1
 *              coordinateY: 12
 *            - coordinateX: 20
 *              coordinateZ: 49
 *              coordinateY: 1
 *            - coordinateX: 13
 *              coordinateZ: 43
 *              coordinateY: 32
 *            - coordinateX: 20
 *              coordinateZ: 11
 *              coordinateY: 11
 */
