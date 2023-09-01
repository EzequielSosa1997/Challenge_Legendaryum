/**
 * @openapi
 * /room/create:
 *   post:
 *     summary: create Room, coin locations must be unique
 *     tags: [ROOM]
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/RoomCreate'
 *     responses:
 *       201:
 *        $ref: '#/components/responses/roomCreateResult'
 *       400:
 *        $ref: '#/components/responses/BadRequest'
 *       500:
 *        $ref: '#/components/responses/serverError'
 */
