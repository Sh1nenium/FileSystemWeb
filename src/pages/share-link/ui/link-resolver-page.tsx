import { resolveShareLinkApi } from "@/shared/api/share-links/resolve-share-link";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function LinkResolverPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const resolveLink = async () => {
          if (!id) {
            navigate('/explorer');
            return;
          }
    
          try {
            await resolveShareLinkApi(id);
            navigate('/explorer');
          } catch (error) {
            toast.error(`Ошибка при обработке ссылки: ${error}`);
            navigate('/explorer');
          }
        };
    
        resolveLink();
      }, [id, navigate]);

      return (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.2rem',
          }}
        >
          ⏳ Подождите, происходит перенаправление...
        </div>
      );
}