import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Migrate1705102287720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "corporations",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "instagram",
                        type: "varchar",
                    },
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "services",
                columns: [
                    {
                        name: "id",
                        type: "int4",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "int",
                    },
                ],
            })
        );
        await queryRunner.createTable(
            new Table({
                name: "corporation_services",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                    },
                    {
                        name: "price",
                        type: "varchar",
                    },
                    {
                        name: "duration",
                        type: "varchar",
                    },
                    {
                        name: "corporation_id",
                        type: "uuid",
                    },
                    {
                        name: "service_id",
                        type: "int4",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "corporation_services",
            new TableForeignKey({
                columnNames: ["corporation_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "corporations",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "corporation_services",
            new TableForeignKey({
                columnNames: ["service_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "services",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "corporation_staff",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                    },
                    {
                        name: "role",
                        type: "int",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "corporation_id",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "corporation_staff",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "corporation_staff",
            new TableForeignKey({
                columnNames: ["corporation_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "corporations",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "corporation_customers",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "person_id",
                        type: "uuid",
                    },
                    {
                        name: "corporation_id",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "corporation_customers",
            new TableForeignKey({
                columnNames: ["person_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "persons",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "corporation_customers",
            new TableForeignKey({
                columnNames: ["corporation_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "corporations",
                onDelete: "CASCADE",
            })
        );
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "int",
                    },
                    {
                        name: "periodicity",
                        type: "varchar",
                    },
                    {
                        name: "currency",
                        type: "varchar",
                    },
                    {
                        name: "is_subscription",
                        type: "boolean",
                    },
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "corporation_staff_services",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                    },
                    {
                        name: "price",
                        type: "varchar",
                    },
                    {
                        name: "duration",
                        type: "varchar",
                    },
                    {
                        name: "corporation_staff_id",
                        type: "uuid",
                    },
                    {
                        name: "service_id",
                        type: "int4",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "corporation_staff_services",
            new TableForeignKey({
                columnNames: ["corporation_staff_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "corporation_staff",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "corporation_staff_services",
            new TableForeignKey({
                columnNames: ["service_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "services",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.query(`
        INSERT INTO services (id, active, name, description, price)
        VALUES
        (1, true, 'Corte Degradê', 'Corte de cabelo degradê masculino', 30),
        (2, true, 'Corte Nevou', 'Corte de cabelo estilo nevou para homens', 25),
        (3, true, 'Progressiva Masculina', 'Serviço de progressiva capilar para homens', 50),
        (4, true, 'Barba Tradicional', 'Corte e modelagem de barba tradicional masculina', 20),
        (5, true, 'Hidratação Capilar Masculina', 'Tratamento de hidratação para cabelos masculinos', 40),
        (6, true, 'Coloração Masculina', 'Serviço de coloração para cabelos masculinos', 35),
        (7, true, 'Corte Feminino', 'Corte de cabelo feminino', 40),
        (8, true, 'Penteado Masculino', 'Serviço de penteado masculino para eventos', 25),
        (9, true, 'Manicure para Homens', 'Cuidado e pintura de unhas masculinas', 20),
        (10, true, 'Pedicure para Homens', 'Cuidado e pintura de unhas dos pés masculinas', 25),
        (11, true, 'Massagem Relaxante para Homens', 'Massagem relaxante masculina', 50),
        (12, true, 'Design de Sobrancelha', 'Modelagem de sobrancelhas unissex', 15),
        (13, true, 'Depilação Masculina', 'Serviço de depilação corporal masculina', 30),
        (14, true, 'Maquiagem', 'Serviço de maquiagem profissional unissex', 40),
        (15, true, 'Corte Infantil', 'Corte de cabelo infantil unissex', 25),
        (16, true, 'Tintura de Sobrancelha', 'Coloração de sobrancelhas unissex', 15),
        (17, true, 'Tratamento Capilar Reconstrutivo', 'Tratamento capilar reconstrutivo unissex', 60),
        (18, true, 'Corte a Seco', 'Corte de cabelo a seco unissex', 30),
        (19, true, 'Tratamento Facial', 'Tratamento estético facial unissex', 45);
    `);


    await queryRunner.query(`INSERT INTO products(id, active, name, description, price, url)
    VALUES
    (1, true, 'Coca-Cola 600ml', 'Garrafa de Coca-Cola 600ml com açúcar', 600, <<ADICIONE URL DA IMAGEM>>),
    (2, true, 'Pepsi 500ml', 'Garrafa de Pepsi 500ml com açúcar', 550, <<ADICIONE URL DA IMAGEM>>),
    (3, true, 'Guaraná Antarctica 2L', 'Garrafa de Guaraná Antarctica 2 litros com açúcar', 1200, <<ADICIONE URL DA IMAGEM>>),
    (4, true, 'Sprite 350ml', 'Garrafa de Sprite 350ml com açúcar', 450, <<ADICIONE URL DA IMAGEM>>),
    (5, true, 'Fanta Laranja 500ml', 'Garrafa de Fanta Laranja 500ml com açúcar', 520, <<ADICIONE URL DA IMAGEM>>),
    (6, true, 'Suco de Uva 1L', 'Garrafa de Suco de Uva 1 litro', 800, <<ADICIONE URL DA IMAGEM>>),
    (7, true, 'Chá Mate 1L', 'Garrafa de Chá Mate 1 litro com açúcar', 650, <<ADICIONE URL DA IMAGEM>>),
    (8, true, 'Cerveja Heineken 355ml', 'Lata de Cerveja Heineken 355ml', 250, <<ADICIONE URL DA IMAGEM>>),
    (9, true, 'Vinho Tinto 750ml', 'Garrafa de Vinho Tinto 750ml', 1500, <<ADICIONE URL DA IMAGEM>>),
    (10, true, 'Água Mineral 500ml', 'Garrafa de Água Mineral 500ml', 200, <<ADICIONE URL DA IMAGEM>>),
    (11, true, 'Biscoito Salgado 150g', 'Pacote de Biscoito Salgado 150g', 350, <<ADICIONE URL DA IMAGEM>>),
    (12, true, 'Salgadinho de Milho 100g', 'Pacote de Salgadinho de Milho 100g', 280, <<ADICIONE URL DA IMAGEM>>),
    (13, true, 'Amendoim Torrado e Salgado 200g', 'Pacote de Amendoim Torrado e Salgado 200g', 400, <<ADICIONE URL DA IMAGEM>>),
    (14, true, 'Chips de Batata 150g', 'Pacote de Chips de Batata 150g', 450, <<ADICIONE URL DA IMAGEM>>),
    (15, true, 'Refrigerante Zero 500ml', 'Garrafa de Refrigerante Zero 500ml', 550, <<ADICIONE URL DA IMAGEM>>),
    (16, true, 'Água Tônica 350ml', 'Garrafa de Água Tônica 350ml', 300, <<ADICIONE URL DA IMAGEM>>),
    (17, true, 'Suco de Laranja 1L', 'Garrafa de Suco de Laranja 1 litro', 700, <<ADICIONE URL DA IMAGEM>>),
    (18, true, 'Cerveja Budweiser 355ml', 'Lata de Cerveja Budweiser 355ml', 300, <<ADICIONE URL DA IMAGEM>>),
    (19, true, 'Chips de Multigrãos 120g', 'Pacote de Chips de Multigrãos 120g', 380, <<ADICIONE URL DA IMAGEM>>),
    (20, true, 'Energético Red Bull 250ml', 'Lata de Energético Red Bull 250ml', 800, <<ADICIONE URL DA IMAGEM>>),
    (21, true, 'Coca-Cola Zero 600ml', 'Garrafa de Coca-Cola Zero 600ml', 600, <<ADICIONE URL DA IMAGEM>>),
    (22, true, 'Batata Frita 200g', 'Pacote de Batata Frita 200g', 450, <<ADICIONE URL DA IMAGEM>>),
    (23, true, 'Guaraná Antarctica Zero 2L', 'Garrafa de Guaraná Antarctica Zero 2 litros', 1100, <<ADICIONE URL DA IMAGEM>>),
    (24, true, 'Refrigerante Guaraná 500ml', 'Garrafa de Refrigerante Guaraná 500ml', 520, <<ADICIONE URL DA IMAGEM>>),
    (25, true, 'Pacote Misto de Salgadinhos 300g', 'Pacote Misto de Salgadinhos 300g', 600, <<ADICIONE URL DA IMAGEM>>),
    (26, true, 'Iced Tea Pêssego 400ml', 'Garrafa de Iced Tea sabor Pêssego 400ml', 450, <<ADICIONE URL DA IMAGEM>>),
    (27, true, 'Biscoito Integral 200g', 'Pacote de Biscoito Integral 200g', 350, <<ADICIONE URL DA IMAGEM>>),
    (28, true, 'Cerveja Stella Artois 355ml', 'Lata de Cerveja Stella Artois 355ml', 280, <<ADICIONE URL DA IMAGEM>>),
    (29, true, 'Água de Coco 330ml', 'Garrafa de Água de Coco 330ml', 250, <<ADICIONE URL DA IMAGEM>>),
    (30, true, 'Suco Detox 250ml', 'Garrafa de Suco Detox 250ml', 400, <<ADICIONE URL DA IMAGEM>>),
    (31, true, 'Castanha de Caju 150g', 'Pacote de Castanha de Caju 150g', 600, <<ADICIONE URL DA IMAGEM>>),
    (32, true, 'Chips de Abacaxi 100g', 'Pacote de Chips de Abacaxi 100g', 320, <<ADICIONE URL DA IMAGEM>>),
    (33, true, 'Refresco de Maracujá 1L', 'Garrafa de Refresco de Maracujá 1 litro', 550, <<ADICIONE URL DA IMAGEM>>),
    (34, true, 'Cerveja Corona Extra 355ml', 'Lata de Cerveja Corona Extra 355ml', 350, <<ADICIONE URL DA IMAGEM>>),
    (35, true, 'Amendoim Doce 200g', 'Pacote de Amendoim Doce 200g', 380, <<ADICIONE URL DA IMAGEM>>),
    (36, true, 'Refrigerante Sprite 500ml', 'Garrafa de Refrigerante Sprite 500ml', 520, <<ADICIONE URL DA IMAGEM>>),
    (37, true, 'Mix de Castanhas 250g', 'Pacote de Mix de Castanhas 250g', 700, <<ADICIONE URL DA IMAGEM>>),
    (38, true, 'Chá Gelado Limão 350ml', 'Garrafa de Chá Gelado sabor Limão 350ml', 300, <<ADICIONE URL DA IMAGEM>>),
    (39, true, 'Cerveja IPA Artesanal 355ml', 'Lata de Cerveja IPA Artesanal 355ml', 450, <<ADICIONE URL DA IMAGEM>>),
    (40, true, 'Mini Croissants (12 unidades)', 'Caixa com 12 Mini Croissants', 250, <<ADICIONE URL DA IMAGEM>>),
    (41, true, 'Refrigerante Guarapan 500ml', 'Garrafa de Refrigerante Guarapan 500ml', 520, <<ADICIONE URL DA IMAGEM>>),
    (42, true, 'Pipoca Natural 120g', 'Pacote de Pipoca Natural 120g', 180, <<ADICIONE URL DA IMAGEM>>),
    (43, true, 'Suco de Maçã 1L', 'Garrafa de Suco de Maçã 1 litro', 700, <<ADICIONE URL DA IMAGEM>>),
    (44, true, 'Biscoito de Queijo 150g', 'Pacote de Biscoito de Queijo 150g', 350, <<ADICIONE URL DA IMAGEM>>),
    (45, true, 'Refrigerante Antarctica 600ml', 'Garrafa de Refrigerante Antarctica 600ml', 550, <<ADICIONE URL DA IMAGEM>>),
    (46, true, 'Chips de Cenoura 100g', 'Pacote de Chips de Cenoura 100g', 320, <<ADICIONE URL DA IMAGEM>>),
    (47, true, 'Cerveja Guinness 440ml', 'Lata de Cerveja Guinness 440ml', 600, <<ADICIONE URL DA IMAGEM>>),
    (48, true, 'Biscoito Integral com Mel 200g', 'Pacote de Biscoito Integral com Mel 200g', 380, <<ADICIONE URL DA IMAGEM>>),
    (49, true, 'Água com Gás 500ml', 'Garrafa de Água com Gás 500ml', 250, <<ADICIONE URL DA IMAGEM>>),
    (50, true, 'Mix de Frutas Secas 150g', 'Pacote de Mix de Frutas Secas 150g', 450, <<ADICIONE URL DA IMAGEM>>),
    (51, true, 'Cerveja Erdinger Weissbier 500ml', 'Garrafa de Cerveja Erdinger Weissbier 500ml', 650, <<ADICIONE URL DA IMAGEM>>),
    (52, true, 'Biscoito de Polvilho 120g', 'Pacote de Biscoito de Polvilho 120g', 120, <<ADICIONE URL DA IMAGEM>>),
    (53, true, 'Refrigerante Limão 500ml', 'Garrafa de Refrigerante sabor Limão 500ml', 520, <<ADICIONE URL DA IMAGEM>>),
    (54, true, 'Amendoim Caramelizado 200g', 'Pacote de Amendoim Caramelizado 200g', 400, <<ADICIONE URL DA IMAGEM>>),
    (55, true, 'Chá Verde 300ml', 'Garrafa de Chá Verde 300ml', 180, <<ADICIONE URL DA IMAGEM>>),
    (56, true, 'Cerveja Bud Light 355ml', 'Lata de Cerveja Bud Light 355ml', 280, <<ADICIONE URL DA IMAGEM>>),
    (57, true, 'Pacote de Palitos Salgados 250g', 'Pacote de Palitos Salgados 250g', 350, <<ADICIONE URL DA IMAGEM>>),
    (58, true, 'Iced Coffee 250ml', 'Lata de Iced Coffee 250ml', 300, <<ADICIONE URL DA IMAGEM>>),
    (59, true, 'Refrigerante Guaraná Zero 600ml', 'Garrafa de Refrigerante Guaraná Zero 600ml', 600, <<ADICIONE URL DA IMAGEM>>),
    (60, true, 'Chips de Batata-Doce 100g', 'Pacote de Chips de Batata-Doce 100g', 320, <<ADICIONE URL DA IMAGEM>>),
    (61, true, 'Cerveja Paulaner Hefe-Weißbier 500ml', 'Garrafa de Cerveja Paulaner Hefe-Weißbier 500ml', 700, <<ADICIONE URL DA IMAGEM>>),
    (62, true, 'Cookies Integrais 150g', 'Pacote de Cookies Integrais 150g', 380, <<ADICIONE URL DA IMAGEM>>),
    (63, true, 'Refrigerante Cola 500ml', 'Garrafa de Refrigerante Cola 500ml', 520, <<ADICIONE URL DA IMAGEM>>),
    (64, true, 'Pacote de Amêndoas Salgadas 200g', 'Pacote de Amêndoas Salgadas 200g', 450, <<ADICIONE URL DA IMAGEM>>),
    (65, true, 'Chá de Hibisco 300ml', 'Garrafa de Chá de Hibisco 300ml', 180, <<ADICIONE URL DA IMAGEM>>),
    (66, true, 'Cerveja Stella Artois Legere 355ml', 'Lata de Cerveja Stella Artois Legere 355ml', 280, <<ADICIONE URL DA IMAGEM>>),
    (67, true, 'Biscoito de Polvilho Queijo 120g', 'Pacote de Biscoito de Polvilho Queijo 120g', 120, <<ADICIONE URL DA IMAGEM>>),
    (68, true, 'Refrigerante Maçã 500ml', 'Garrafa de Refrigerante sabor Maçã 500ml', 520, <<ADICIONE URL DA IMAGEM>>),
    (69, true, 'Amendoim Picante 200g', 'Pacote de Amendoim Picante 200g', 400, <<ADICIONE URL DA IMAGEM>>),
    (70, true, 'Chá de Camomila 300ml', 'Garrafa de Chá de Camomila 300ml', 180, <<ADICIONE URL DA IMAGEM>>),
    (71, true, 'Cerveja IPA Session 355ml', 'Lata de Cerveja IPA Session 355ml', 280, <<ADICIONE URL DA IMAGEM>>),
    (72, true, 'Pacote de Palitos de Queijo 150g', 'Pacote de Palitos de Queijo 150g', 350, <<ADICIONE URL DA IMAGEM>>),
    (73, true, 'Iced Tea Limão 400ml', 'Garrafa de Iced Tea sabor Limão 400ml', 450, <<ADICIONE URL DA IMAGEM>>),
    (74, true, 'Refrigerante Laranja 500ml', 'Garrafa de Refrigerante sabor Laranja 500ml', 520, <<ADICIONE URL DA IMAGEM>>),
    (75, true, 'Chips de Mandioca 100g', 'Pacote de Chips de Mandioca 100g', 320, <<ADICIONE URL DA IMAGEM>>),
    (76, true, 'Cerveja Beck’s 355ml', 'Lata de Cerveja Beck’s 355ml', 280, <<ADICIONE URL DA IMAGEM>>),
    (77, true, 'Pacote de Cookies com Gotas de Chocolate 200g', 'Pacote de Cookies com Gotas de Chocolate 200g', 380, <<ADICIONE URL DA IMAGEM>>),
    (78, true, 'Água Saborizada Frutas Vermelhas 500ml', 'Garrafa de Água Saborizada Frutas Vermelhas 500ml', 250, <<ADICIONE URL DA IMAGEM>>),
    (79, true, 'Mix de Nuts 150g', 'Pacote de Mix de Nuts 150g', 450, <<ADICIONE URL DA IMAGEM>>),
    (80, true, 'Chá de Frutas Vermelhas 300ml', 'Garrafa de Chá de Frutas Vermelhas 300ml', 180, <<ADICIONE URL DA IMAGEM>>);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
