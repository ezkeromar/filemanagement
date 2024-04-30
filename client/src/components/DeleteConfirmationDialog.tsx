"use client";
import { useState } from 'react';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  onDelete?: () => void; 
}

export function DeleteConfirmationDialog({ isOpen, onClose, onDelete }: DeleteConfirmationDialogProps) {
  const handleClose = () => {
    onClose && onClose();
  };

  const handleDelete = () => {
    onDelete && onDelete(); 
    handleClose(); 
    handleClose(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#171b5e]">
        <DialogHeader>
          <h1> Confirmation</h1>
          <DialogDescription>
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button variant="default" onClick={handleClose}>Cancel</Button>
          {/* <Button variant="danger" onClick={handleDelete}>Delete</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
