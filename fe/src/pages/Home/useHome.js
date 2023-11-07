import {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (
      prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleRefetchContacts() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contactBeingDeleted.id !== contact.id,
      ));

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });

      handleCloseDeleteModal();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar um contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    contacts,
    filteredContacts,
    isLoading,
    contactBeingDeleted,
    isDeleteModalVisible,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    searchTerm,
    hasError,
    handleRefetchContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  };
}
