import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Prop {
  title: string;
  onDelete: (data?: any) => void;
}
const DeleteButtonDialog = ({ title, onDelete }: Prop) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-400">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader className="mb-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Are You sure You Want To delete?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <Button className="bg-red-500 hover:bg-red-400" onClick={onDelete}>
            Delete
          </Button>
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteButtonDialog;
