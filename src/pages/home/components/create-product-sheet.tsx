import { useListRawMaterialsQuery } from '@/hooks/queries/use-list-raw-materials-query';

import { FormGroup } from '@/components/form-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

export function CreateProductSheet() {
  const { rawMaterialList } = useListRawMaterialsQuery();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Adicionar Produto</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cadastrar produto</SheetTitle>
          <SheetDescription>
            Inclua um novo produto e gerencie seu estoque da melhor forma.
          </SheetDescription>
        </SheetHeader>

        <form
          id="create-product-form"
          onSubmit={() => {}}
          className="flex flex-col gap-4 overflow-y-auto p-4"
        >
          <FormGroup>
            <Label htmlFor="name">Nome</Label>

            <Input
              id="name"
              placeholder="Ex.: Copo Descartável 200ml"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="code">Código</Label>

            <Input id="code" placeholder="Ex.: P-011" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">Preço</Label>

            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>R$</InputGroupText>
              </InputGroupAddon>

              <InputGroupInput
                id="price"
                type="number"
                placeholder="0.00"
                required
              />

              <InputGroupAddon align="inline-end">
                <InputGroupText>BRL</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Descrição</Label>

            <InputGroup>
              <InputGroupTextarea
                id="description"
                maxLength={500}
                placeholder="Descreva detalhes sobre o produto"
              />

              <InputGroupAddon align="block-end">
                <InputGroupText className="text-xs">0/500</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <Separator />

          <div>
            <Label>Matérias primas necessárias</Label>

            {rawMaterialList.map(({ id, code, name }) => {
              return (
                <div
                  key={`raw-material-list-${id}`}
                  className="mt-2 flex flex-col gap-2"
                >
                  <div className="flex flex-col gap-2">
                    <Checkbox label={`${code} - ${name}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </form>

        <SheetFooter>
          <Button type="submit" form="create-product-form">
            Cadastrar
          </Button>

          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
