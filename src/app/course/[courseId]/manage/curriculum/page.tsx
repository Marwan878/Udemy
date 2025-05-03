"use client";

import { useCourseManagement } from "@/contexts/course-management";
import { AlertCircle, Plus, X } from "lucide-react";
import PageCard from "../page-card";
import Module from "./components/module";
import { Button } from "@/components/general";
import NewSectionForm from "./components/new-section-form";
import { useState } from "react";

export default function Page() {
  const { modules } = useCourseManagement();
  const [newModuleFormIsVisible, setNewModuleFormIsVisible] = useState(false);

  return (
    <PageCard heading="Curriculum" className="pb-8">
      <div>
        <div className="rounded-[1.6rem] border border-[#d1d2e0] p-4 gap-x-4 flex">
          <AlertCircle color="#6d28d2" />
          <div>
            <h2 className="heading-md">
              Here's where you add course content. Click a + icon on the left to
              get started.
            </h2>
          </div>
        </div>
        <p className="mt-8 mb-3">
          Start putting together your course by creating sections and lectures.
          Use your course outline to structure your content and label your
          sections and lectures clearly.
        </p>

        {modules.map((module, i) => (
          <Module key={module.id} module={module} order={i + 1} />
        ))}
      </div>
      {/* new module button and form */}
      <Button
        variant={newModuleFormIsVisible ? "ghost" : "secondary"}
        height="md"
        className="font-bold min-w-0 mt-6 mb-3"
        onClick={() => setNewModuleFormIsVisible((prev) => !prev)}
        aria-label={
          newModuleFormIsVisible
            ? "Close new module form."
            : "Open new module form."
        }
      >
        {newModuleFormIsVisible ? (
          <X aria-hidden />
        ) : (
          <>
            <Plus color="#303141" aria-label="Add" /> Section
          </>
        )}
      </Button>
      {newModuleFormIsVisible && (
        <NewSectionForm setNewModuleFormIsVisible={setNewModuleFormIsVisible} />
      )}
    </PageCard>
  );
}
