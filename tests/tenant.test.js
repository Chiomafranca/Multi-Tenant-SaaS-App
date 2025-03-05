// Tenant Tests (tenant.test.js)
test('POST /api/tenants - should create a tenant', async () => {
    await request(app).post('/api/tenants').send({ name: 'NewTenant' }).expect(200);
  });