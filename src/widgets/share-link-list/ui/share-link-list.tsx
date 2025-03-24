import styles from "./shareLinkList.module.scss"
import _ from "lodash"
import { ShareLink, ShareRights } from "@/entities/explorer-object/model/types";
import { ShareLinkItemPanel } from "@/entities/share-links/ui/share-link-item-panel";
import { useShareLinkRepository } from "@/entities/explorer-object/model/share-link.repository";

export function ShareLinkList({
  objectId,
  className
} : {
  objectId: string;
  className: string;
}) {

  var { data, deleteShareLink } = useShareLinkRepository(objectId);
  var objects: ShareLink[] | undefined = data?.data;

  const handleDelete = (id: string) => {
    deleteShareLink(id)
  };

  console.log(objectId)

  const handleEdit = (id: string) => {
    console.log('Edit link:', id);
  };

  return (
    <div className={`${styles['share-link-list']} ${className}`}>
      {_.map(objects, (link => (
        <ShareLinkItemPanel
          key={link.id}
          shareLink={link}
          onDelete={handleDelete}
        />
      )))}
    </div>
  );
}