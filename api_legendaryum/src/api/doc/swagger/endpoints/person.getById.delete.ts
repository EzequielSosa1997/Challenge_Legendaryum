/**
 * @openapi
 * /person/delete/{id}:
 *   delete:
 *     summary: delete by id
 *     tags: [PERSON]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: format uuid
 *     responses:
 *       201:
 *        $ref: '#/components/responses/personDeleteResult'
 *       400:
 *        $ref: '#/components/responses/BadRequest'
 *       500:
 *        $ref: '#/components/responses/serverError'
 */
