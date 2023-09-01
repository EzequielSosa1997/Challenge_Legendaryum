/**
 * @openapi
 * /coin/delete/{id}:
 *   delete:
 *     summary: delete by id
 *     tags: [COIN]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: format uuid
 *     responses:
 *       200:
 *        $ref: '#/components/responses/coinDeleteResult'
 *       400:
 *        $ref: '#/components/responses/BadRequest'
 *       500:
 *        $ref: '#/components/responses/serverError'
 */
