# Salvar dados do lead

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **POST** na rota **/api/leads**
2. ✅ Valida dados obrigatórios **nome** e **email**
3. ⛔ Valida o **email**
4. ✅ **Salva** os dados fornecidos
5. ✅ Retorna **400** se o email já estiver cadastrado

> ## Exceções
1. ✅ Retorna **400** se  **nome** ou **email** não forem fornecidos pelo client
2. ✅ Retorna **400** se  o **email** for inválido
3. ✅ Retorna **500** se der erro ao tentar salvar os dados

> ## Status do lead
 INTERESTED,
 CUSTOMER,
 CANCELED

✅
⛔