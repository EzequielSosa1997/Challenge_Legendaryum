/**
 * @openapi
 * /room/getById/{id}:
 *   get:
 *     summary: get by id room
 *     tags: [ROOM]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: format uuid
 *     responses:
 *       200:
 *        $ref: '#/components/responses/roomGetByIdResult'
 *       400:
 *        $ref: '#/components/responses/BadRequest'
 *       500:
 *        $ref: '#/components/responses/serverError'
 */
