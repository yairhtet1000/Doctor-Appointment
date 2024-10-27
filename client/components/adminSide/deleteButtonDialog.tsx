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
  disable: boolean;
}
const DeleteButtonDialog = ({ title, onDelete, disable }: Prop) => {
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
          <Button
            className="bg-red-500 hover:bg-red-400"
            onClick={onDelete}
            disabled={disable}
          >
            Delete
          </Button>
          <DialogClose>
            <Button variant="secondary" disabled={disable}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteButtonDialog;
