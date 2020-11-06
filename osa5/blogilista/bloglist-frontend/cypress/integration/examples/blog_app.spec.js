describe("Blog ", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", {
      name: "mikko",
      username: "mikko",
      password: "salainen",
    });
    cy.visit("http://localhost:3000");
  });
  it("loginform is shown", function () {
    cy.contains("blogs");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mikko");
      cy.get("#password").type("salainen");
      cy.get("#loginbutton").click();
      cy.contains("mikko logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("mikko");
      cy.get("#password").type("salaine");
      cy.get("#loginbutton").click();
      cy.contains("wrong credentials");
    });
  });
});
