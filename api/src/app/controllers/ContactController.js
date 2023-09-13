const ContactRepository = require('../repositories/ContactRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    // Criar novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid Category ID' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    if (email) {
      const contactExists = await ContactRepository.findByEmail(email);
      if (contactExists) {
        // 400: Bad Request
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' });
    }

    const {
      name, email, phone, category_id,
    } = request.body;

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid Category ID' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (email) {
      const contactByEmail = await ContactRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        // 400: Bad Request
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' });
    }

    await ContactRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
